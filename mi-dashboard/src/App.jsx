import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [steps, setSteps] = useState(0);
  const [weeklySteps, setWeeklySteps] = useState([]);
  const [activeTab, setActiveTab] = useState("Panel");
  const [habits, setHabits] = useState([
    "Estudiar 2 horas al día",
    "Caminar al campus",
  ]);
  const [meals, setMeals] = useState([
    "Desayuno: Arepa con huevo",
    "Almuerzo: Pollo a la plancha",
    "Cena: Ensalada",
  ]);
  const [activity, setActivity] = useState([
    "Fútbol 45 min",
    "Gimnasio 30 min",
  ]);
  const [sleep, setSleep] = useState([
    "420 minutos dormidos el 20/09/2025",
    "480 minutos dormidos el 21/09/2025",
  ]);
  const [newHabit, setNewHabit] = useState("");
  const [newMeal, setNewMeal] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [sleepInput, setSleepInput] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Juan Pérez",
    age: 20,
    height: 1.75,
    weight: 68,
    career: "Ingeniería de Sistemas",
    photo: "https://via.placeholder.com/40",
  });

  // Cargar pasos y gráfico
  useEffect(() => {
    const randomSteps = Math.floor(Math.random() * (10000 - 3000) + 3000);
    setSteps(randomSteps);

    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const data = days.map((day) => ({
      name: day,
      pasos: Math.floor(Math.random() * (12000 - 4000) + 4000),
    }));
    setWeeklySteps(data);
  }, []);

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, newHabit]);
      setNewHabit("");
    }
  };

  const addMeal = () => {
    if (newMeal.trim()) {
      setMeals([...meals, newMeal]);
      setNewMeal("");
    }
  };

  const addActivity = () => {
    if (newActivity.trim()) {
      setActivity([...activity, newActivity]);
      setNewActivity("");
    }
  };

  const registerSleep = () => {
    if (sleepInput.trim()) {
      const today = new Date().toLocaleDateString();
      setSleep([...sleep, `${sleepInput} minutos dormidos el ${today}`]);
      setSleepInput("");
    }
  };

  const removeSleep = (index) => {
    setSleep(sleep.filter((_, i) => i !== index));
  };

  const totalSleepHours = sleep.reduce((acc, entry) => {
    const minutes = parseInt(entry.split(" ")[0], 10);
    return acc + (isNaN(minutes) ? 0 : minutes);
  }, 0);

  const calcularIMC = () => {
    return (profile.weight / (profile.height * profile.height)).toFixed(2);
  };

  const tabs = [
    "Panel",
    "Hábitos",
    "Nutrición",
    "Actividad",
    "Sueño",
    "Comunidad",
    "Recompensas",
    "Guía",
  ];

  // Recetas basadas en IMC + carrera
  const recetasRecomendadas = () => {
    const imc = parseFloat(calcularIMC());
    let recetas = [];

    if (imc < 18.5) {
      recetas = [
        "🍝 Pasta con pollo y verduras",
        "🥤 Batido energético de avena y banano",
        "🍚 Arroz con huevo y aguacate",
      ];
    } else if (imc < 25) {
      recetas = [
        "🥗 Ensalada César con pollo",
        "🌯 Wrap integral de atún",
        "🥦 Arroz integral con verduras",
      ];
    } else {
      recetas = [
        "🥕 Sopa de verduras",
        "🥬 Ensalada fresca",
        "🍗 Pechuga a la plancha con ensalada",
      ];
    }

    if (profile.career.includes("Sistemas")) {
      recetas.push("💻 Snack ligero para largas horas frente al PC: frutos secos");
    } else if (profile.career.includes("Medicina")) {
      recetas.push("⚕️ Almuerzo balanceado: arroz integral, pescado y ensalada");
    } else if (profile.career.includes("Derecho")) {
      recetas.push("📚 Ensalada de quinoa para concentración y energía");
    }

    return recetas;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior */}
      <div className="flex justify-between items-center bg-white shadow p-3">
        <h1 className="text-lg font-bold">🎓 ViveUni Saludable</h1>
        <div className="flex items-center space-x-3">
          <img
            src={profile.photo}
            alt="Perfil"
            className="w-8 h-8 rounded-full border cursor-pointer"
            onClick={() => setIsProfileOpen(true)}
          />
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <Card className="shadow hover:shadow-lg transition rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-gray-600">Pasos de hoy</h2>
            <p className="text-2xl font-bold text-blue-500">{steps}</p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-gray-600">Agua</h2>
            <p className="text-2xl font-bold text-blue-500">{meals.length} vasos</p>
            <p className="text-xs text-gray-500 mt-1">
              Se calculan a partir de tus comidas registradas.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow hover:shadow-lg transition rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-gray-600">Horas de sueño</h2>
            <p className="text-2xl font-bold text-purple-500">
              {(totalSleepHours / 60).toFixed(1)} h
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Menú estilo pestañas */}
      <div className="flex justify-center space-x-2 md:space-x-6 border-t p-3 bg-white shadow rounded-b-xl flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl transition font-semibold ${
              activeTab === tab
                ? "bg-blue-100 text-blue-600 shadow"
                : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contenido dinámico */}
      <div className="p-6">
        {activeTab === "Panel" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-2">📊 Progreso semanal</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklySteps}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="pasos"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-4">🎯 Objetivo: 10,000 pasos/día</p>
              <p>
                <strong>IMC:</strong> {calcularIMC()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-2">🔔 Recordatorios</h2>
              <ul className="space-y-2 text-gray-700">
                <li>💧 Beber agua cada 2 horas</li>
                <li>🧘 Pausa activa cada 10 min</li>
                <li>🥪 Preparar snack saludable</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "Sueño" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Registro de sueño</h2>
            <div className="flex space-x-2 mb-3">
              <Input
                value={sleepInput}
                onChange={(e) => setSleepInput(e.target.value)}
                placeholder="Minutos dormidos"
              />
              <Button onClick={registerSleep}>Registrar sueño</Button>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {sleep.map((s, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{s}</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeSleep(i)}
                  >
                    Quitar
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Guía" && (
          <div>
            <h2 className="text-lg font-bold mb-2">🍽 Recetas recomendadas</h2>
            <ul className="list-disc pl-5 space-y-2">
              {recetasRecomendadas().map((receta, i) => (
                <li key={i}>{receta}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Hábitos" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Mis hábitos</h2>
            <div className="flex space-x-2 mb-3">
              <Input
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Agregar hábito"
              />
              <Button onClick={addHabit}>Agregar</Button>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {habits.map((habit, i) => (
                <li key={i}>{habit}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Nutrición" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Registro de comidas</h2>
            <div className="flex space-x-2 mb-3">
              <Input
                value={newMeal}
                onChange={(e) => setNewMeal(e.target.value)}
                placeholder="Agregar comida"
              />
              <Button onClick={addMeal}>Agregar</Button>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {meals.map((meal, i) => (
                <li key={i}>{meal}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Actividad" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Registro de actividad</h2>
            <div className="flex space-x-2 mb-3">
              <Input
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                placeholder="Deporte o actividad"
              />
              <Button onClick={addActivity}>Registrar</Button>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {activity.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Comunidad" && (
          <p>🤝 Conecta con otros estudiantes: foro de debate y grupos de estudio.</p>
        )}
        {activeTab === "Recompensas" && <p>🏆 Has ganado 3 logros este mes 🎖️</p>}
      </div>

      {/* Drawer Perfil */}
      <Drawer open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar perfil</DrawerTitle>
            <DrawerDescription>
              Actualiza tu información para recomendaciones personalizadas
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-3">
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Nombre"
            />
            <Input
              type="number"
              value={profile.age}
              onChange={(e) =>
                setProfile({ ...profile, age: parseInt(e.target.value) })
              }
              placeholder="Edad"
            />
            <Input
              type="number"
              step="0.01"
              value={profile.height}
              onChange={(e) =>
                setProfile({ ...profile, height: parseFloat(e.target.value) })
              }
              placeholder="Estatura (m)"
            />
            <Input
              type="number"
              value={profile.weight}
              onChange={(e) =>
                setProfile({ ...profile, weight: parseFloat(e.target.value) })
              }
              placeholder="Peso (kg)"
            />
            <Select
              value={profile.career}
              onValueChange={(val) => setProfile({ ...profile, career: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ingeniería de Sistemas">
                  Ingeniería de Sistemas
                </SelectItem>
                <SelectItem value="Medicina">Medicina</SelectItem>
                <SelectItem value="Derecho">Derecho</SelectItem>
                <SelectItem value="Administración">
                  Administración
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Cerrar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
