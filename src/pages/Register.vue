<script setup>
import { ref, onMounted } from 'vue'
import { register } from '../services/auth'
import { useRouter } from 'vue-router'
import { VIcon } from 'vuetify/components'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()
const logoExists = ref(true)

const posters = [
  'https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg',
  'https://image.tmdb.org/t/p/w500/8rpDcsfLJypbO6vREc0547VKqEv.jpg',
  'https://image.tmdb.org/t/p/w500/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg',
  'https://image.tmdb.org/t/p/w500/3TNSoaQqT3r7b3l3GBwQpQzG8hE.jpg',
  'https://image.tmdb.org/t/p/w500/6faYaQyiBPhqAizldJKq21mIVaE.jpg',
  'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
  'https://image.tmdb.org/t/p/w500/2vFQFYY7QwG0gmd5rA1l2xY8qQg.jpg',
  'https://image.tmdb.org/t/p/w500/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
]

async function handleRegister(e) {
  e.preventDefault()
  loading.value = true
  error.value = ''
  try {
    await register(name.value, email.value, password.value)
    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao registrar.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetch('/src/assets/logo.svg').then(r => {
    if (!r.ok) logoExists.value = false
  }).catch(() => logoExists.value = false)
})
</script>

<template>
  <v-app>
    <div class="login-bg">
      <div class="login-overlay"></div>
      <div class="login-gradient"></div>
      <div class="login-posters">
        <img v-for="(poster, i) in posters" :key="i" :src="poster" class="login-poster" />
      </div>
      <div class="login-center">
        <v-card class="login-card-glass animate-card-in" max-width="380" elevation="24">
          <div class="text-center mb-7">
            <div class="logo-anim mb-4">
              <img v-if="logoExists" src="/src/assets/logo.svg" alt="Logo Watch" width="60" height="60" />
              <v-icon v-else color="secondary" size="60">mdi-movie-open</v-icon>
            </div>
            <h1 class="text-h5 font-extrabold mb-1 text-white tracking-wide animate-title">Registrar</h1>
            <span class="text-body-2 text-grey-lighten-1">Crie sua conta para começar</span>
          </div>
          <v-form @submit="handleRegister" class="login-form">
            <v-text-field
              v-model="name"
              label="Nome"
              type="text"
              variant="outlined"
              color="yellow"
              class="mb-2 login-input force-white"
              required
              prepend-inner-icon="mdi-account"
              autocomplete="name"
              density="comfortable"
              :rules="[v => !!v || 'Digite seu nome']"
            />
            <v-text-field
              v-model="email"
              label="E-mail"
              type="email"
              variant="outlined"
              color="yellow"
              class="mb-2 login-input force-white"
              required
              prepend-inner-icon="mdi-email"
              autocomplete="email"
              density="comfortable"
              :rules="[v => !!v || 'Digite seu e-mail']"
            />
            <v-text-field
              v-model="password"
              type="password"
              label="Senha"
              variant="outlined"
              color="yellow"
              class="force-white"
              required
              prepend-inner-icon="mdi-lock"
              autocomplete="new-password"
              density="comfortable"
              :rules="[v => !!v || 'Digite sua senha']"
            />
            <v-btn :loading="loading" :disabled="loading" type="submit" color="yellow" class="login-btn-anim force-yellow" size="large" elevation="12" block>
              <span v-if="!loading">Registrar</span>
              <span v-else class="d-flex align-center"><v-progress-circular indeterminate color="primary" size="20" class="mr-2" />Registrando...</span>
            </v-btn>
            <div v-if="error" class="text-red text-center text-caption mt-2 animate-error">{{ error }}</div>
          </v-form>
          <div class="mt-7 text-center">
            <span class="text-grey-lighten-1">Já tem uma conta?</span>
            <router-link to="/login" class="ml-2 text-secondary font-bold hover:underline">Entrar</router-link>
          </div>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.login-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  background: #18181B;
}
.login-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 20, 40, 0.88);
  z-index: 1;
}
.login-gradient {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: radial-gradient(ellipse at 60% 0%, rgba(25,118,210,0.12) 0%, rgba(20,20,20,0.97) 100%);
}
.login-posters {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2px;
  z-index: 0;
  filter: blur(12px) brightness(0.38);
  pointer-events: none;
}
.login-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.login-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card-glass {
  background: rgba(30, 30, 30, 0.92) !important;
  box-shadow: 0 16px 64px 0 rgba(0,0,0,0.55);
  backdrop-filter: blur(18px) saturate(1.4);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 1.3rem;
  padding: 2.5rem 2rem 2.2rem 2rem;
  animation: card-fade-in 1s cubic-bezier(.4,0,.2,1);
}
.login-form {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.logo-anim img {
  animation: logo-pop 1.2s cubic-bezier(.4,0,.2,1);
  filter: drop-shadow(0 4px 24px #1976d2cc);
}
@keyframes logo-pop {
  0% { opacity: 0; transform: scale(0.7) rotate(-10deg); }
  60% { opacity: 1; transform: scale(1.1) rotate(2deg); }
  100% { opacity: 1; transform: scale(1) rotate(0); }
}
.animate-title {
  animation: title-fade-in 1.1s cubic-bezier(.4,0,.2,1);
}
@keyframes title-fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
}
.login-btn-anim {
  width: 100% !important;
  display: block !important;
  font-weight: 700;
  letter-spacing: 0.03em;
  border-radius: 0.5rem !important;
  padding-top: 0.95rem;
  padding-bottom: 0.95rem;
  font-size: 1.13rem;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
  box-shadow: 0 4px 24px 0 #FFD60040 !important;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  overflow: hidden;
  text-align: center;
  justify-content: center !important;
  align-items: center !important;
}
.login-btn-anim span {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-btn-anim:hover {
  background: #FFD600 !important;
  color: #18181B !important;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 32px 0 #FFD600cc;
}
.login-input input {
  color: #fff !important;
  background: transparent !important;
}
.v-text-field .v-field__outline {
  border-color: #1976D2 !important;
}
.v-text-field .v-label {
  color: #bdbdbd !important;
}
.animate-error {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}
@media (max-width: 600px) {
  .login-card-glass {
    padding: 1.1rem !important;
    max-width: 98vw !important;
  }
  .logo-anim img {
    width: 44px;
    height: 44px;
  }
}
</style> 