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
