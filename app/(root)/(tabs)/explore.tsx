import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useEffect } from "react";
import { Card } from "@/components/Cards";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import NoResults from "@/components/NoResults";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import Filters from "@/components/Filters";

const Explore = () => {
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();
    const {
        data: properties,
        refetch,
        loading,
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
        },
        skip: true,
    });

    const handleCardPress = (id: string) => {
        router.push(`/properties/${id}`);
    };
    useEffect(() => {
        refetch({
            query: params.query!,
            filter: params.filter!,
        });
    }, [params.filter, params.query]);

    return (
        <SafeAreaView className="h-full bg-white">
            <FlatList
                data={properties}
                renderItem={({ item }) => (
                    <Card
                        item={item}
                        onPress={() => handleCardPress(item.$id)}
                    />
                )}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator
                            size={"large"}
                            className="text-primary-300 mt-5"
                        />
                    ) : (
                        <NoResults />
                    )
                }
                ListHeaderComponent={() => (
                    <View className="px-5">
                        {/* Header Search */}
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                            >
                                <Image
                                    source={icons.backArrow}
                                    className="size-5"
                                />
                            </TouchableOpacity>
                            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                                Search for Your Ideal Home
                            </Text>
                            <Image source={icons.bell} className="w-6 h-6" />
                        </View>
                        {/* Search */}
                        <Search />
                        {/* Filter */}
                        <View className="mt-5">
                            <Filters />
                            <Text className="text-xl font-rubik-bold text-black-300 mt-5">Found {properties?.length} Properties</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Explore;
