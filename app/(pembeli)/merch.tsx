import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function ClaimPage() {
  const [claimed, setClaimed] = useState<string[]>([]);

  const rewards = [
    { id: '1', title: 'Diskon 10%', desc: 'Dapatkan diskon 10% untuk transaksi berikutnya', icon: 'pricetag-outline' },
    { id: '2', title: 'Gratis Ongkir', desc: 'Berlaku untuk pengiriman hingga Rp10.000', icon: 'car-outline' },
    { id: '3', title: 'Voucher Rp20.000', desc: 'Tanpa minimum belanja!', icon: 'gift-outline' },
  ];

  const handleClaim = (id: string) => {
    if (!claimed.includes(id)) {
      setClaimed([...claimed, id]);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Klaim Hadiah Kamu 🎉</Text>
        }
        renderItem={({ item }) => (
          <LinearGradient
            colors={['#220593', '#26C2FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 15, padding: 16, marginBottom: 16 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={item.icon as any} size={32} color="#fff" style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>{item.title}</Text>
                <Text style={{ fontSize: 12, color: '#f2f2f2' }}>{item.desc}</Text>
                {/* <Image source={require('../../assets/images/bang_udah_bang.png')}/> */}

              </View>
              <TouchableOpacity
                onPress={() => handleClaim(item.id)}
                disabled={claimed.includes(item.id)}
                style={{
                  backgroundColor: claimed.includes(item.id) ? '#888' : '#fff',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginLeft: 10
                }}
              >
                <Text style={{ color: claimed.includes(item.id) ? '#eee' : '#220593', fontSize: 12, fontWeight: 'bold' }}>
                  {claimed.includes(item.id) ? 'Diklaim' : 'Klaim'}
                </Text>
                
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
      />
    </SafeAreaView>
  );
}