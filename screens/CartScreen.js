import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slice/RestaurantSlice";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../slice/CartSlice";
import { urlFor } from "../sanity";

export default function CartScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);
  const TotalCart = useSelector(selectCartTotal);
  const DeliveryFees = 2;
  const totalAmount = TotalCart + DeliveryFees;

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInCart(groupedItems);
  }, [items]);

  return (
    <SafeAreaView>
      <View className="bg-white p-3 shadow-md mb-4 mt-6">
        <Text className="text-center text-xl font-extrabold text-[#1a4155]">Panier</Text>
        <Text className="text-center text-gray-500 text-xs font-medium">
          {items.length > 0
            ? `Vous avez ${items.length} plats dans votre panier depuis :`
            : "Votre panier est vide..."}
        </Text>
        <Text className="text-center text-gray-500 text-xs font-medium mt-1">
          {items.length > 0 ? restaurant?.name : "Pas de restaurant"}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" bg-[#f17e5e] p-1 rounded-full absolute right-4 top-4 shadow-md"
        >
          <XMarkIcon size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between bg-white p-2 shadow-md mb-3">
        <View className="flex-row items-center space-x-3">
          <Image
            source={require("../assets/images/bikeGuy.png")}
            className=" w-10 h-10 rounded-full object-contain"
          />
          <Text className="font-bold text-sm text-[#1a4155]">
          Livraison en 40 à 60 minutes
          </Text>
        </View>
        <TouchableOpacity>
          <Text className="font-extrabold text-[#f17e5e] text-sm">Modifier</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className=" h-[380px]"
        vertical
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedItemsInCart).map(([key, items]) => (
          <View
            key={key}
            className="flex-row items-center space-x-3 bg-white py-2 px-5 my-1 shadow-sm"
          >
            <Text className="font-extrabold text-[#f17e5e]">
              {items.length} x
            </Text>
            <Image
              source={{ uri: urlFor(items[0]?.image).url() }}
              className="h-12 w-12 rounded-full"
            />
            <Text className="flex-1 font-semibold text-[#1a4155]">{items[0]?.name}</Text>
            <Text className=" text-gray-700 font-extrabold">
              USD {items[0]?.price.toLocaleString()}
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(removeFromCart({ id: key }))}
            >
              <Text className="font-extrabold text-xs text-[#f17e5e]">
                Supprimer
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* total amount */}
      <View className="bg-white p-5 my-4 shadow-sm space-y-4">
        <View className="flex-row justify-between">
          <Text className=" font-medium text-gray-500">Sous-total</Text>
          <Text className="font-extrabold text-gray-700">
          USD {""} {TotalCart.toLocaleString()}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className=" font-medium text-gray-500">Frais de livraison</Text>
          <Text className="font-extrabold text-gray-700">
          USD {""} {items.length > 0 ? DeliveryFees : "0"}
          </Text>
        </View>
        <View className="flex-row justify-between border-t border-gray-400 pt-3">
          <Text className=" font-extrabold text-gray-700">Prix total</Text>
          <Text className="font-extrabold text-gray-800">
          USD {""} {items.length > 0 ? totalAmount.toLocaleString() : "0"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Preparing")}
          className=" bg-[#f17e5e] p-3 rounded-lg mx-2 mb-3"
        >
          <Text className=" font-extrabold text-white text-base text-center">
          Commander
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
