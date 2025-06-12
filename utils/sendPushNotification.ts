export async function sendPushNotification(
  expoPushToken: string,
  title: string,
  body: string,
  channelId: string = "default"
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { sentBy: "self" },
    android: {
      channelId, 
      color: "#FF5733",
    },
  };

  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    console.log("✅ Notifikasi berhasil dikirim:", data);
  } catch (error) {
    console.error("❌ Gagal kirim notifikasi:", error);
  }
}