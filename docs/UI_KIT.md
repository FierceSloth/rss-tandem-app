# 🎨 UI Kit & Global Components

## Button

Компонент кнопки поддерживает темы и автоматическую обработку кликов.
![alt text](./assets/button-preview.png)

### Варианты (Variants)

| Variant   | Описание               |
| :-------- | :--------------------- |
| `primary` | Основная (белая)       |
| `ghost`   | Контурная (прозрачная) |

### Пример использования

```typescript
import { Button } from '@/components/common/button';

const button = new Button({
  text: 'Click Me',
  variant: 'primary',
  onClick: () => console.log('Clicked!')
});

if (...) {
  button.setDisabled(true);
}

this.append(button);
```

## Input

Компонент поля ввода с поддержкой валидации, состояний ошибки и лейблов.
Ошибка отображается снизу, не смещая контент.

![alt text](./assets/input-preview.png)

### Свойства (Props)

| Свойство      | Тип        | Описание                                                         |
| :------------ | :--------- | :--------------------------------------------------------------- |
| `labelText`   | `string`   | Текст заголовка над полем (необязательно)                        |
| `placeholder` | `string`   | Текст-подсказка внутри поля                                      |
| `type`        | `string`   | Тип инпута (`text`, `password`, `email` и т.д.). Default: `text` |
| `className`   | `string[]` | Дополнительные CSS классы                                        |

### Публичные методы (API)

| Метод               | Описание                                                                       |
| :------------------ | :----------------------------------------------------------------------------- |
| `getValue()`        | Возвращает текущее значение (string).                                          |
| `setValue(val)`     | Устанавливает значение программно.                                             |
| `validate(fn)`      | Запускает функцию-валидатор. Возвращает `true`/`false` и визуализирует ошибку. |
| `setError(msg)`     | Принудительно показывает ошибку с заданным текстом.                            |
| `clearError()`      | Скрывает ошибку и очищает текст сообщения.                                     |
| `setDisabled(bool)` | Блокирует (`true`) или разблокирует (`false`) поле ввода.                      |

### Пример использования

```typescript
import { Input } from '@/components/ui/input';
import { IValidateResult } from '@/common/types/types';

// 1. Создаем валидатор (чистая функция)
const emailValidator = (value: string): IValidateResult => {
  const brokenRules = [
    {
      condition: (email: string): boolean => email.length === 0,
      errorMessage: 'Email is required',
    },
    {
      condition: (email: string): boolean => !email.includes('@'),
      errorMessage: 'Invalid email format',
    },
    // ... Добавляем сколько угодно проверок
  ];

  const firstBrokenRule = brokenRules.find((rule) => rule.condition(value));

  if (firstBrokenRule) {
    return { isValid: false, errorMessage: firstBrokenRule.errorMessage };
  }

  return { isValid: true };
};

// 2. Создаем компонент
const emailInput = new Input({
  labelText: 'Email Address',
  type: 'email',
  placeholder: 'user@tandem.com',
});

// 3. Вешаем валидацию на ввод (валидация в реальном времени)
emailInput.addListener('input', () => {
  emailInput.validate(emailValidator);
});

// 4. Или проверяем при отправке формы
submitBtn.addListener('click', () => {
  const isValid = emailInput.validate(emailValidator);

  if (isValid) {
    console.log('Sending data:', emailInput.getValue());
  }
});

this.append(emailInput);
```
