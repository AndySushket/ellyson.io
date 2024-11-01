// firebaseAnalytics.ts
import { getAnalytics, Analytics } from "firebase/analytics";
import { getApp } from "firebase/app";

let analytics: Analytics | null = null;

const initAnalytics = (): Analytics | null => {
  if (typeof window !== "undefined" && !analytics) {
    try {
      const app = getApp(); // Проверяем инициализацию Firebase App
      analytics = getAnalytics(app); // Инициализируем Analytics
    } catch (error) {
      console.error("Не удалось инициализировать Firebase Analytics:", error);
    }
  }
  return analytics;
};

export default initAnalytics;
