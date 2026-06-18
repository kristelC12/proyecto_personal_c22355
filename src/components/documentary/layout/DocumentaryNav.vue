<script setup>
defineProps({
  sections: {
    type: Array,
    default: () => [],
  },
  activeSection: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <nav class="documentary-nav">
    <div class="nav-track">
      <a
        v-for="section in sections"
        :key="section.id"
        :href="`#section-${section.id}`"
        :class="{ active: activeSection === section.id }"
      >
        <span class="dot"></span>
        <span class="label">{{ section.title }}</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.documentary-nav {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  z-index: 1000;
  max-width: 95vw;
}

.nav-track {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.6rem;

  background: rgba(20, 12, 8, 0.55);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.documentary-nav a {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  text-decoration: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  white-space: nowrap;

  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  transition:
    color 0.3s ease,
    background 0.3s ease,
    transform 0.25s ease;
}

/* Puntito indicador a la izquierda del texto */
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  transition:
    background 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* HOVER */
.documentary-nav a:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.documentary-nav a:hover .dot {
  background: var(--primary-color);
  transform: scale(1.3);
}

/* ACTIVO */
.documentary-nav a.active {
  color: #fff;
  background: linear-gradient(135deg, var(--primary-color), rgba(0, 0, 0, 0.25));
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.documentary-nav a.active .dot {
  background: #fff;
  transform: scale(1.4);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* Animación de "pulso" en el activo */
.documentary-nav a.active .dot::after {
  content: '';
  position: absolute;
  left: 0.95rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary-color);
  animation: pulse 1.8s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(3.5);
    opacity: 0;
  }
}

/* TABLET / MÓVIL: solo puntos, sin texto */
@media (max-width: 900px) {
  .documentary-nav .label {
    display: none;
  }

  .documentary-nav a {
    padding: 0.6rem;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 480px) {
  .documentary-nav {
    bottom: 14px;
  }

  .nav-track {
    gap: 0.15rem;
    padding: 0.4rem;
  }
}
</style>
