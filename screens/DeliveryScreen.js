import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../slice/RestaurantSlice";
import { PhoneIcon, XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

export default function DeliveryScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  console.log("Restaurant Slice", restaurant);
  return (
    <View className=" bg-[#f17e5e] flex-1">
      <SafeAreaView className=" z-50">
        <View className=" flex-row justify-between items-center p-5 mt-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon size={20} color="white" />
          </TouchableOpacity>
          <Text className=" font-light text-white text-base">Besoin d'aide ?</Text>
        </View>
        <View className=" bg-white mx-5 my-2 rounded-lg p-6 z-50 shadow-lg">
          <View className="flex-row justify-between">
            <View>
              <Text className=" font-bold text-gray-400 text-base">
              Arrivée estimée
              </Text>
              <Text className="text-2xl font-extrabold text-[#1a4155]">40-60 Minutes</Text>
            </View>
            <Image
              source={require("../assets/images/bikeGuy2.gif")}
              className="w-16 h-16"
            />
          </View>
          <Progress.Bar width={140} indeterminate={true} color="#f17e5e" />
          <Text className=" mt-3 text-gray-500 text-xs font-medium">
          Votre commande est en cours de préparation
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.name}
          description={restaurant.description}
          identifier="origin"
          pinColor="#f17e5e"
        />
      </MapView>
      <SafeAreaView className="bg-[#f17e5e">
        <View className="flex-row items-center justify-between space-x-3 p-4 mx-5">
          <Image
            source={require("../assets/images/bikeGuy.png")}
            className=" w-14 h-14 rounded-full border border-white"
          />
          <View className="flex-1">
            <Text className=" font-extrabold text-base text-white">
            Valentino Rossi
            </Text>
            <Text className=" font-bold text-xs text-gray-100">Votre Motard</Text>
          </View>
          <TouchableOpacity className=" bg-white rounded-full p-2 flex items-center justify-center">
            <PhoneIcon size={20} color="#f17e5e" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
