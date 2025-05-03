import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const generalOptions = [
    { label: 'Profile Settings' },
    { label: 'History' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={generalOptions}
        keyExtractor={(item) => item.label}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 100, paddingTop: 0 }}
        ListHeaderComponent={
          <>
            <LinearGradient colors={['#26C2FF', '#220593']} start={{ x: 2, y: 0 }} end={{ x: 0, y: 0 }} style={{ alignItems: 'center', paddingTop: 40, paddingBottom: 30, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
              <Image source={require('../../assets/images/pasha.jpg')} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: '#fff', marginBottom: 12 }} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Pasha Rakha Paruntungan</Text>
              <Text style={{ fontSize: 12, color: '#eee', marginBottom: 20 }}>pasharakha09@gmail.com</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 15, paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center', width: '40%' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3A82F7', marginBottom: 4 }}>Rp 300.000</Text>
                  <Text style={{ fontSize: 12, color: '#444' }}>icon top up</Text>
                </View>
                <View style={{ backgroundColor: '#fff', borderRadius: 15, paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center', width: '40%' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3A82F7', marginBottom: 4 }}>200</Text>
                  <Text style={{ fontSize: 12, color: '#444' }}>icon tukar point</Text>
                </View>
              </View>
            </LinearGradient>
            <View style={{ paddingHorizontal: 0, paddingTop: 30 }}>
              <Text style={{ fontSize: 12, color: '#777', marginBottom: 10 }}>GENERAL</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={{ backgroundColor: '#EDEDED', borderRadius: 10, paddingVertical: 16, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>{item.label}</Text>
            <Text style={{ fontSize: 16, color: '#888' }}>{'>'}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
