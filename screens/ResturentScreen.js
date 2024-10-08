import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import * as Icon from "react-native-feather";
import { themeColors } from "../themes";
import DishRow from "../components/dishRow";
import CartIcon from "../components/cartIcon";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";

export default function ResturentScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  let item = params;

  const dispatch = useDispatch();

  // console.log("Restaurant", item);

  useEffect(() => {
    if (item && item.id) {
      dispatch(setRestaurant({ ...item }));
    }
  }, []);

  return (
    <View>
      {/*  cart in restaurant screen bottom icon added */}
      <StatusBar style="light" />
      <CartIcon />
      <ScrollView>
        <View className="relative ">
          <Image className="w-full h-72" source={item.image} />

          {/* ArrowBack button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-2  bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>

          <View
            style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
            className="bg-white -mt-8 pt-5"
          >
            <Text className="text-3xl font-bold ml-5">{item.name}</Text>

            <View className="flex-row items-center space-x-1">
              <View className="flex-row items-center space-x-1 pl-2">
                <Icon.Star height={"15"} width={"15"} stroke={"orange"} />

                <Text className="text-green-700">
                  {item.stars}{" "}
                  <Text className="text-xs text-gray-700">
                    ({item.reviews} reviews).
                    <Text className="font-bold">Fast Food</Text>
                  </Text>
                </Text>
              </View>
              <View className="flex-row p-2">
                <Icon.MapPin height={"15"} width={"15"} stroke={"gray"} />

                <Text className="font-normal text-xs ">
                  Nearby - {item.address}
                </Text>
              </View>
            </View>
            <View className="flex-row pb-2 pl-2">
              <Text className="font-normal ">{item.description}</Text>
            </View>

            <View className="pb-36 bg-white">
              <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
              {/* Dishes */}

              {item.dishes.map((dish, index) => (
                <DishRow item={{ ...dish }} key={index} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
