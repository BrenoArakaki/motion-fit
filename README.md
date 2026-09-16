# MotionFit 🏋️

Dashboard de treinos desenvolvido com React, TypeScript e Firebase, criado para acompanhar exercícios, progresso semanal, streak de dias consecutivos e conquistas.

## ✨ Preview
<img width="1912" height="907" alt="image" src="https://github.com/user-attachments/assets/590bf5e7-9f64-491f-bd66-55c9cdaf8985" />
<img width="1902" height="1050" alt="image" src="https://github.com/user-attachments/assets/bb798d55-3dac-4ed5-a803-8eccd0399f52" />


## 🚀 Funcionalidades

* **Calendário semanal:** visualização dos 7 dias da semana e identificação dos dias com treino.
* **Streak:** contador de dias consecutivos com treino, calculado a partir dos dados reais.
* **Exercícios:** adicionar, editar progresso, alterar status e excluir exercícios.
* **Stats Today:** exercícios concluídos, séries realizadas e estimativa de calorias.
* **Achievements:** sistema de conquistas com níveis Bronze, Silver e Gold.

## 🛠️ Tecnologias

* React + TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Firebase Authentication
* Cloud Firestore
* lucide-react

## ⚙️ Como executar

### Pré-requisitos

* Node.js
* Projeto configurado no Firebase

### Instalação

```bash
git clone https://github.com/SEU_USUARIO/motion-fit.git
cd motion-fit/motion-app
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Configure o Firebase Authentication e o Cloud Firestore com as credenciais do seu projeto.

### Executar

```bash
npm run dev
```

## 🗄️ Estrutura do Firestore

```text
users/{uid}
├── workouts/{YYYY-MM-DD}
│   └── exercises/{exerciseId}
└── achievements/{achievementId}
```

Os dados são organizados por usuário, garantindo a separação dos treinos e conquistas no Firestore.
