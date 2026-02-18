import { Component } from './components/base/component';
import { Card } from './components/layout/card/card.view';
import './styles/style.scss';
// точка входа
const text1 = new Component({ tag: 'h3', text: 'Glass' });
const text2 = new Component({ tag: 'h3', text: 'Default' });
const card1 = new Card({ glass: true, padding: 'hg' }, text1);
const card2 = new Card({ glass: false, padding: 'hg' }, text2);

document.body.append(card1.node, card2.node);
