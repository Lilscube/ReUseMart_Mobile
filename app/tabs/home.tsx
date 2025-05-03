import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Elektronik' },
    { name: 'Fashion' },
    { name: 'Otomotif' },
    { name: 'Buku' },
    { name: 'Furniture' },
  ];

  const allProducts = [
    { name: 'Kamera Canon AE-1', price: 'Rp850.000' },
    { name: 'Meja Belajar Kayu', price: 'Rp910.000' },
    { name: 'Jaket Denim Levis', price: 'Rp460.000' },
    { name: 'Speaker JBL GO', price: 'Rp250.000' },
    { name: 'Sepatu Nike Air Force 1', price: 'Rp1.250.000' },
    { name: 'Jam Tangan Casio', price: 'Rp320.000' },
    { name: 'Headphone Sony WH-1000XM4', price: 'Rp3.499.000' },
  ];

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 100, paddingTop: 0 }}
        ListHeaderComponent={
          <>
            <LinearGradient colors={['#26C2FF', '#220593']} start={{ x: 2, y: 0 }} end={{ x: 0, y: 0 }} style={{ paddingTop: 100, paddingBottom: 30, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
              <Text style={{ color: '#f2f2f2', fontSize: 14, marginTop: 1, marginBottom: 5, fontFamily: 'Poppins' }}>Selamat Pagi,</Text>
              <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold', marginBottom: 10, fontFamily: 'Montage' }}>Pasha Rakha Paruntung</Text>
            </LinearGradient>

            {/* Search Bar */}
            <View style={{ paddingHorizontal: 10, marginTop: 16 }}>
              <View style={{ borderRadius: 25, overflow: 'hidden' }}>
                <LinearGradient colors={['#220593', '#26C2FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ padding: 1.5, borderRadius: 25 }}>
                  <View style={{ backgroundColor: '#fff', borderRadius: 25, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 }}>
                    <TextInput
                      placeholder="Cari apa hari ini?"
                      placeholderTextColor="#888"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      style={{ flex: 1, color: '#000', fontSize: 14 }}
                    />
                    <Ionicons name="search-outline" size={18} color="#26C2FF" />
                  </View>
                </LinearGradient>
              </View>
            </View>

            {/* Keunggulan Fitur */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, paddingHorizontal: 10 }}>
              {[
                { title: 'HARGA YANG RASIONAL', desc: 'Kamu tetap bisa dapetin barang berkualitas tanpa bikin dompet menjerit.', icon: 'pricetag-outline' },
                { title: 'BARANG NGGAK ASAL', desc: 'Semua barang udah dicek – bebas cacat, asli, dan pastinya masih kece.', icon: 'checkmark-done-outline' },
                { title: 'KEUNTUNGAN MAKSIMAL', desc: 'Tukar poin dari setiap transaksi jadi diskon atau merchandise keren.', icon: 'gift-outline' },
              ].map((item, index) => (
                <LinearGradient key={index} colors={['#220593', '#26C2FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1, marginRight: index < 2 ? 8 : 0, borderRadius: 20, padding: 12 }}>
                  <View style={{ alignItems: 'flex-start' }}>
                    <Ionicons name={item.icon as any} size={24} color="#fff" />
                    <Text></Text>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4, fontFamily: 'Montage' }}>{item.title}</Text>
                    <Text style={{ color: '#fff', fontSize: 9, fontFamily: 'Poppins' }}>{item.desc}</Text>
                  </View>
                </LinearGradient>
              ))}
            </View>

            {/* Kategori */}
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Jelajahi Kategori</Text>
              <FlatList
                data={categories}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={{ width: 80, height: 100, backgroundColor: '#f2f2f2', marginRight: 10, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#ddd' }} />
                    <Text style={{ marginTop: 5, fontSize: 12 }}>{item.name}</Text>
                  </View>
                )}
              />
            </View>

            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Barang Baru Nih!</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={{ width: itemWidth, backgroundColor: '#f7f7f7', borderRadius: 15, padding: 10, position: 'relative' }}>
            <View style={{ width: '100%', height: 150, borderRadius: 10, backgroundColor: '#ddd', marginBottom: 10 }} />
            <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#888' }}>{item.price}</Text>
              <TouchableOpacity style={{ backgroundColor: '#26C2FF', borderRadius: 20, padding: 6 }}>
                <Ionicons name="cart" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
