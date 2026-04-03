import { trueFalseEmitter } from '@/pages/true-false-page/common/utils/true-false-emmiter.util';
import type { TrueFalseButtons } from './true-false-buttons.view';
import { Action, TrueFalseEvents, TrueFalseViewState } from '@/pages/true-false-page/common/enums/enums';
import { messages } from '@/pages/true-false-page/common/constants/messages';
import { trueFalseStore } from '@/pages/true-false-page/store/true-false.store';

export class TrueFalseButtonsController {
  private view: TrueFalseButtons;

  constructor(view: TrueFalseButtons) {
    this.view = view;
    this.setButtons();

    trueFalseEmitter.on(TrueFalseEvents.MARK_ANSWER, this.view.markCorrect);
    trueFalseEmitter.on(TrueFalseEvents.PROGRESS, this.view.resetState);
  }

  public destroy(): void {
    trueFalseEmitter.off(TrueFalseEvents.MARK_ANSWER, this.view.markCorrect);
    trueFalseEmitter.off(TrueFalseEvents.PROGRESS, this.view.resetState);
  }

  private setButtons = (): void => {
    this.view.verifyButton.name.setText(messages.buttons.verifyButton);
    this.view.verifyButton.description.setText(messages.buttons.confirmStatement);
    this.view.rejectButton.name.setText(messages.buttons.rejectButton);
    this.view.rejectButton.description.setText(messages.buttons.denyStatement);

    this.view.verifyButton.addListener('click', this.onConfirm);
    this.view.rejectButton.addListener('click', this.onDeny);
  };

  private onConfirm = (): void => {
    if (trueFalseStore.getState().status === TrueFalseViewState.ERROR) {
      return;
    }
    trueFalseEmitter.emit(TrueFalseEvents.ANSWER, { action: Action.CONFIRM });
  };

  private onDeny = (): void => {
    if (trueFalseStore.getState().status === TrueFalseViewState.ERROR) {
      return;
    }
    trueFalseEmitter.emit(TrueFalseEvents.ANSWER, { action: Action.DENY });
  };
}
