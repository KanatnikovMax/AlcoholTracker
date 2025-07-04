# "Алкокалькулятор"

Fullstack мобильное приложение для расчета концентрации алкоголя в крови (в промилле) на основе антропометрических данных пользователя и характеристик потребленных напитков. Приложение помогает пользователям оценить степень опьянения и время выведения алкоголя из организма.

Отдельный репозиторий сервиса расчётов: 
https://github.com/aanikandrov/Java8-CalculationService


## 🧰 Стек технологий

### 🔙 Backend (Java + Spring Boot)

| Технология            | Назначение                                 |
|------------------------|---------------------------------------------|
| **Spring Boot**        | Основной фреймворк                         |
| **Spring Security + JWT** | Авторизация и аутентификация через токены |
| **PostgreSQL**         | Реляционная база данных                    |
| **JPA (Hibernate)**    | ORM для работы с БД                        |
| **Lombok**             | Упрощение написания кода                   |
| **MapStruct**          | Маппинг DTO и Entity                      |

---

### 📱 Frontend (React Native)

| Технология              | Назначение                                |
|--------------------------|--------------------------------------------|
| **React Native (Expo)**  | Кроссплатформенная разработка мобильного приложения |
| **React Navigation**     | Навигация между экранами                  |
| **AsyncStorage**         | Хранение токена и данных локально         |
| **Axios**                | Работа с REST API                         |
| **Styled Components**    | Стилизация компонентов                    |
| **Context API / Redux**  | Управление состоянием                     |

## ⚙️ Функционал

Приложение предоставляет следующие возможности:

- 🔐 **Регистрация и ввод личных параметров**  
  Указание возраста, пола, роста, веса — всё, что важно для точного расчёта.

- 🍾 **Расчёт алкоголя для застолья**  
  Учитываются личные параметры и внешние факторы: сытость, желаемый уровень промилле.

- ✏️ **Изменение параметров**  
  Пользователь может в любой момент обновить свои личные данные.

- 🗣 **Обратная связь по рекомендациям**  
  После застолья можно оценить рекомендации и повлиять на улучшение расчётов в будущем.

- 🕓 **История застолий**  
  Просмотр прошлых вечеринок с рекомендациями и своей обратной связью.

> 🍻 **Всем пить — но с умом!**
