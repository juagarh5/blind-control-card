#include <WiFi.h>
#include <PubSubClient.h>
#include "BLEDevice.h"
#include <stdlib.h>

static BLEUUID serviceUUID("0000fe50-0000-1000-8000-00805f9b34fb");
static BLEUUID    charUUID("0000fe51-0000-1000-8000-00805f9b34fb");

const char* ssid        = "Dio schifoso";
const char* password    = "porcodio";
const char* mqtt_server = "192.168.1.103";

static boolean doConnect = false;
static boolean connected = false;
static boolean doScan = false;
static BLERemoteCharacteristic* pRemoteCharacteristic;
static BLEAdvertisedDevice* myDevice;

WiFiClient espClient;
PubSubClient client(espClient);

static void notifyCallback(
  BLERemoteCharacteristic* pBLERemoteCharacteristic,
  uint8_t* pData,
  size_t length,
  bool isNotify) {
  String message = "";
  char   cmessage[length * 2 + 1];

  Serial.print("Notify callback for characteristic ");
  Serial.print(pBLERemoteCharacteristic->getUUID().toString().c_str());
  Serial.print(" of data length ");
  Serial.println(length);

  for (int i = 0; i < length; i++) {
    pData = pData + i; //Pointer + (2*i)bytes
    if (String(*pData, HEX).length() == 1) {
      message += "0" + String(*pData, HEX);
    }
    else {
      message += String(*pData, HEX);
    }
    pData = pData - i;
  }

  Serial.println(message);
  message.toUpperCase();
  message.toCharArray(cmessage, length * 2 + 1);

  //Notification filter and publish
  String id = message.substring(2, 4);
  if (id == "A2" || id == "A7" || id == "11" || id == "22" || id == "17") {
    client.publish("am43/notifications", cmessage);
  }

}

class MyClientCallback : public BLEClientCallbacks {
    void onConnect(BLEClient* pclient) {
    }

    void onDisconnect(BLEClient* pclient) {
      connected = false;
      Serial.println("onDisconnect");
    }
};

bool connectToServer() {
  BLEClient*  pClient  = BLEDevice::createClient();
  pClient->setClientCallbacks(new MyClientCallback());
  pClient->connect(myDevice);

  BLERemoteService* pRemoteService = pClient->getService(serviceUUID);
  pRemoteCharacteristic = pRemoteService->getCharacteristic(charUUID);
  pRemoteCharacteristic->registerForNotify(notifyCallback);

  connected = true;
  return true;
}

class MyAdvertisedDeviceCallbacks: public BLEAdvertisedDeviceCallbacks {

    void onResult(BLEAdvertisedDevice advertisedDevice) {

      if (advertisedDevice.haveServiceUUID() && advertisedDevice.isAdvertisingService(serviceUUID)) {

        BLEDevice::getScan()->stop();
        myDevice = new BLEAdvertisedDevice(advertisedDevice);
        doConnect = true;
        doScan = true;

      }
    }
};

void setup() {

  Serial.begin(115200);

  //WiFi connection
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Serial.println("WiFi Connected");

  //MQTT connection
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  if (client.connect("espClient") && client.subscribe("am43/commands")) {
    Serial.println("MQTT Connected");
  }


  //Bluetooth connection
  BLEDevice::init("");
  BLEScan* pBLEScan = BLEDevice::getScan();
  pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
  pBLEScan->setInterval(1349);
  pBLEScan->setWindow(449);
  pBLEScan->setActiveScan(true);
  pBLEScan->start(5, false);


}

void callback(char* topic, byte* payload, unsigned int length) {

  String   message;

  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  String id = message.substring(2, 4);

  char     cmessage[3];
  byte     command[message.length() / 2];


  for (int i = 0; i < sizeof(command); i++) {

    message.substring(2 * i, 2 * i + 2).toCharArray(cmessage, 3);
    command[i] = strtol(cmessage, NULL, 16);
  }

  pRemoteCharacteristic->writeValue(command, sizeof(command));

}

void reconnect() {

  while (!client.connected()) {
    client.connect("espClient");
    client.subscribe("am43/commands");
    delay(1000);
  }

}

void loop() {

  if (doConnect == true) {
    if (connectToServer()) {
      Serial.println("We are now connected to the BLE Server.");
    } else {
      Serial.println("We have failed to connect to the server; there is nothin more we will do.");
    }
    doConnect = false;
  }

  if (connected) {
    if (!client.connected()) {
      reconnect();
    }
    client.loop();
  } else if (doScan) {
    BLEDevice::getScan()->start(0);
  }

}
