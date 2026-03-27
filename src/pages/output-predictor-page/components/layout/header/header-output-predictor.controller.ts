import { OutputPredictorRepository } from '@/pages/output-predictor-page/repositories/output-predictor.repositories';
import type { HeaderOutputPredictor } from './header.view';

export class HeaderOutputPredictorController {
  private readonly repository: OutputPredictorRepository;
  private readonly view: HeaderOutputPredictor;

  constructor(view: HeaderOutputPredictor) {
    this.view = view;
    this.repository = new OutputPredictorRepository();
  }

  public async loadTitle(levelId: string, simulationIndex: number = 0): Promise<void> {
    const questions = await this.repository.fetchQuestions(levelId);

    if (questions.length === 0) return;

    const question = questions[simulationIndex] ?? questions[0];
    this.view.setTitle(question.title);
  }

  public async loadTitleById(levelId: string, questionId: string): Promise<void> {
    const questions = await this.repository.fetchQuestions(levelId);

    const question = questions.find((q) => q.id === questionId);
    if (question) {
      this.view.setTitle(question.title);
    }
  }

  public destroy(): void {
    this.view.destroy();
  }
}
