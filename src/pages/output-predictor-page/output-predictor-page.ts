import styles from './output-predictor-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { OutputPredictorRepository } from './repositories/output-predictor.repositories';
import { OptionCard } from './components/features/option-card/option-card.view';
import { OutputPredictorMain } from './components/features/main/main.view';

const LEVEL_ID = '65dbc9a2-57d7-40d5-a266-a7f045f9e808';

export class OutputPredictorPage implements IPage {
  public render(): Component {
    const root = new PageLayout({ className: styles.outputPredictor, withSidebar: false });

    const main = new OutputPredictorMain({});
    root.append(main);

    const repo = new OutputPredictorRepository();

    repo
      .fetchQuestions(LEVEL_ID)
      .then((tasks) => {
        const first = tasks[0];
        if (!first) return;

        // Код вопроса → в редактор
        main.setCode(first.code ?? '');

        // Тег → в header
        main.setMeta(first.tag);

        // Карточки вариантов → в OutputOptions
        const cards = first.options.map(
          (opt, index) =>
            new OptionCard({
              optionKey: opt.key,
              lines: opt.lines,
              index,
            })
        );
        main.container.outputOptions.setOptions(cards);
      })
      .catch(console.error);
    return root;
  }

  public destroy(): void {}
}
