import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#26C2FF', '#220593']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>
      {/* Avatar */}
      <View style={{ marginBottom: 150, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <View style={{ width: 200, height: 200, borderRadius: 120, backgroundColor: '#d9d9d9' }} />
      </View>

      {/* Text */}
      <Text style={{ fontSize: 60, fontFamily: 'Montage', color: '#fff', fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }}>Welcome to</Text>
      <Text style={{ color: '#00ffe0', fontFamily: 'Montage', fontSize: 48, fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }}>ReUseMart</Text>
      <Text style={{ color: '#eeeeee', fontSize: 14, fontFamily: 'Poppins', textAlign: 'left', marginTop: 10, marginBottom: 30, alignSelf: 'flex-start' }}>Jual dan Belanja barang bekas di ReUseMart bla bla bla</Text>

      {/* Button */}
      <TouchableOpacity onPress={() => router.push('/login')} style={{ borderRadius: 40, overflow: 'hidden', width: '100%', backgroundColor: '#1b005f' }}>
        <LinearGradient colors={['#220593', '#26C2FF']} start={{ x: 0.3, y: 0 }} end={{ x: 1.3, y: 0 }} style={{ paddingVertical: 12, paddingHorizontal: 50, borderRadius: 25, borderWidth: 1.5, borderColor: '#5de6ff', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, textAlign: 'center' }}>Masuk</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}
