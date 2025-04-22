//Matheus Henrique Heinzen
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

//Biblioteca com todos os humores e suas respectivas características
const moods = {
  morning: {
    Clear: { emoji: "☀️😄", label: "Manhã ensolarada!", bgColor: "#FFD700", textColor: "#333" },
    Clouds: { emoji: "☁️😐", label: "Nublado pela manhã", bgColor: "#D3D3D3", textColor: "#333" },
    Rain: { emoji: "🌧️🥱", label: "Chuva matinal... preguiça", bgColor: "#4682B4", textColor: "#FFF" },
    Thunderstorm: { emoji: "⛈️😨", label: "Tempestade! Melhor esperar", bgColor: "#483D8B", textColor: "#FFF" },
    Snow: { emoji: "❄️🤯", label: "NEVANDO?! No Brasil?!", bgColor: "#E6E6FA", textColor: "#333" },
    Drizzle: { emoji: "🌦️😕", label: "Chuviscando...", bgColor: "#87CEEB", textColor: "#333" },
    Mist: { emoji: "🌫️😶", label: "Névoa matinal", bgColor: "#E0E0E0", textColor: "#333" },
    Smoke: { emoji: "💨😷", label: "Ar poluído, cuidado!", bgColor: "#696969", textColor: "#FFF" },
    Haze: { emoji: "😶‍🌫️", label: "Neblina seca", bgColor: "#A9A9A9", textColor: "#333" },
    Dust: { emoji: "🏜️🤧", label: "Muito pó no ar", bgColor: "#CD853F", textColor: "#FFF" },
    Fog: { emoji: "🌁😶", label: "Nevoeiro denso", bgColor: "#C0C0C0", textColor: "#333" },
    Squall: { emoji: "🌬️😳", label: "Rajadas de vento forte", bgColor: "#778899", textColor: "#FFF" },
  },
  afternoon: {
    Clear: { emoji: "🌞😎", label: "Sol forte! Protetor solar!", bgColor: "#FFA500", textColor: "#333" },
    Clouds: { emoji: "⛅😌", label: "Nuvens amenizam o calor", bgColor: "#B0C4DE", textColor: "#333" },
    Rain: { emoji: "🌧️😩", label: "Chuva à tarde", bgColor: "#1E90FF", textColor: "#FFF" },
    Thunderstorm: { emoji: "⚡😰", label: "Trovoadas! Cuidado!", bgColor: "#4B0082", textColor: "#FFF" },
    Snow: { emoji: "❄️🧊", label: "Neve à tarde (raro!)", bgColor: "#ADD8E6", textColor: "#333" },
    Drizzle: { emoji: "🌧️🧐", label: "Garoa chata", bgColor: "#6495ED", textColor: "#FFF" },
    Mist: { emoji: "🌥️", label: "Névoa à tarde", bgColor: "#DCDCDC", textColor: "#333" },
    Smoke: { emoji: "🏭😷", label: "Poluição pesada", bgColor: "#708090", textColor: "#FFF" },
    Haze: { emoji: "😵‍💫", label: "Neblina quente", bgColor: "#BEBEBE", textColor: "#333" },
    Dust: { emoji: "💨🤧", label: "Vento com poeira", bgColor: "#D2B48C", textColor: "#333" },
    Fog: { emoji: "🌫️", label: "Nevoeiro persistente", bgColor: "#A9A9A9", textColor: "#FFF" },
    Squall: { emoji: "💨😬", label: "Ventos muito fortes", bgColor: "#4682B4", textColor: "#FFF" },
  },
  night: {
    Clear: { emoji: "🌕😌", label: "Noite estrelada", bgColor: "#191970", textColor: "#FFF" },
    Clouds: { emoji: "☁️😴", label: "Nublado e tranquilo", bgColor: "#2F4F4F", textColor: "#FFF" },
    Rain: { emoji: "🌧️🛌", label: "Chuva perfeita para dormir", bgColor: "#000080", textColor: "#FFF" },
    Thunderstorm: { emoji: "⚡😨", label: "Tempestade noturna!", bgColor: "#00008B", textColor: "#FFF" },
    Snow: { emoji: "❄️🌌", label: "Neve à noite", bgColor: "#E6E6FA", textColor: "#333" },
    Drizzle: { emoji: "🌧️😑", label: "Chuva fina noturna", bgColor: "#4169E1", textColor: "#FFF" },
    Smoke: { emoji: "🌆😷", label: "Poluição noturna", bgColor: "#696969", textColor: "#FFF" },
    Haze: { emoji: "😶‍🌫️", label: "Neblina à noite", bgColor: "#505050", textColor: "#FFF" },
    Dust: { emoji: "🌑🤧", label: "Poeira noturna", bgColor: "#8B4513", textColor: "#FFF" },
    Fog: { emoji: "🌁😶", label: "Nevoeiro denso", bgColor: "#708090", textColor: "#FFF" },
    Squall: { emoji: "💨😳", label: "Rajadas noturnas", bgColor: "#4682B4", textColor: "#FFF" },
  }
};

//Pega a hora atual e compara se é de manhã, tarde ou noite
function getTimeOfDay(hour) {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "night";
}

//Cria o display
function MoodDisplay() {
  const [weather, setWeather] = useState(null);
  //Até pegar as informações, aparece essas informações
  const [mood, setMood] = useState({ 
    emoji: "⏳", 
    label: "Carregando clima...",
    bgColor: "#f5f5f5",
    textColor: "#333"
  });
  //Outras infos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [locationName, setLocationName] = useState("Carregando...");
  
  //Requisita do navegador a localização atual
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setError(null);
        },
        //Se de erro, usa a localização de Curitiba
        (err) => {
          console.error("Erro ao obter localização:", err);
          setError("Localização não permitida - usando Curitiba como padrão");
          setLocation({ lat: -25.4284, lon: -49.2733 });
        }
      );
      //Se a localização não for suportada, também usa a de Curitiba
    } else {
      setError("Geolocalização não suportada - usando Curitiba como padrão");
      setLocation({ lat: -25.4284, lon: -49.2733 });
    }
  };

//Algumas localizações que eu salvei caso precise demonstrar
  //Curitiba
  //setLocation({ lat: -25.4284, lon: -49.2733 });

  //Dubai
  //setLocation({ lat: 25.276987, lon: 55.296249 });
  
  //Porto Alegre
  //SetLocation({ lat: -30.0346, lon: -51.2177 });
  
  //Manaus
  //setLocation({ lat: -3.1190, lon: -60.0217 });
  
  //Londres
  //setLocation({ lat: 51.5074, lon: -0.1278 });

  //Atualiza as informações (Clima, temperatura e nome do local)
  const updateMood = (climate, temp, name) => {
    const hour = new Date().getHours();
    const timeOfDay = getTimeOfDay(hour);
    const selectedMood = moods[timeOfDay][climate] || { 
      emoji: "❓", 
      label: `Clima ${climate}`,
      bgColor: "#f5f5f5",
      textColor: "#333"
    };
    setWeather(climate);
    setMood(selectedMood);
    setTemperature(temp);
    setLocationName(name);
    setLoading(false);
  };


  useEffect(() => {
    getLocation();
  }, []);

  //Pega as informações da API
  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;
      
      try {
        setLoading(true);
        const response = await fetch(
          //Link da api OpenWeatherMap e a key
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=4017f695214b04877ee90e5ece64ef50&units=metric&lang=pt_br`
        );
        if (!response.ok) throw new Error("Erro na API");
        const data = await response.json();
        const weatherMain = data.weather[0].main;
        const temp = Math.round(data.main.temp);
        const name = data.name || "Local desconhecido";
        updateMood(weatherMain, temp, name);
      } catch (error) {
        console.error("Erro ao buscar clima:", error);
        setError("Não foi possível carregar o clima");
        //Se não consiga puxar nada por erro na API, vai colocar o Fallback
        updateMood("Clear", 25, "Curitiba");
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  //Se der erro, aparece o erro em cima do display
  if (error) {
    return (
      <div className="app-container" style={{ backgroundColor: mood.bgColor }}>
        <div className="mood-box">
          <div className="error-message">{error}</div>
          {!loading && (
            <>
              <div className="emoji">{mood.emoji}</div>
              <div className="label">{mood.label}</div>
              <div className="weather-info">Condição: {weather}</div>
              <div className="time-info">{new Date().toLocaleTimeString()}</div>
            </>
          )}
        </div>
      </div>
    );
  }

  //E o display sendo gerado bonitinho
  return (
    <div className="app-container" style={{ backgroundColor: mood.bgColor }}>
      <AnimatePresence mode="wait">
      <div className="background-overlay"></div>
        <motion.div
          key={loading ? "loading" : mood.emoji}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mood-box"
          style={{ 
            backgroundColor: `${mood.bgColor}80`, // 80 = 50% opacity
            color: mood.textColor,
            border: `2px solid ${mood.textColor}`
          }}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{ fontSize: "3rem" }}
            >
              ⏳
            </motion.div>
          ) : (
            <>
            <div className="location-name">{locationName}</div>
              <motion.div 
                className="emoji"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {mood.emoji}
              </motion.div>
              <div className="label">{mood.label}</div>
              <motion.div 
                className="weather-info"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                {weather && `Condição: ${weather}`}
              </motion.div>
              <div className="temperature">
                {temperature !== null && `${temperature}°C`}
              </div>
              <div className="time-info">
                {new Date().toLocaleTimeString()}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MoodDisplay;