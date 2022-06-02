import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { HeroById, Hero } from '../../interfaces/pb/hero';
import { IHeroService } from './hero.interface';

@Injectable()
export class HeroService implements IHeroService {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 3, name: 'Doe' },
    { id: 4, name: 'Doe' },
    { id: 5, name: 'Doe' },
    { id: 6, name: 'Doe' },
    { id: 7, name: 'Doe' },
    { id: 8, name: 'Doe' },
    { id: 9, name: 'Doe' },
  ];

  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  getHeroBiyId(heroId: number): Hero {
    return this.items.find(({ id }) => heroId === id);
  }

  getHeroByClientStream(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroById) => {
      this.logger.log(
        'HeroService.ClientStreamAsObservable received %o',
        heroById,
      );
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => {
      hero$.complete();
      this.logger.log('HeroService.ClientStreamAsObservable completed');
    };
    data$.subscribe({
      next: onNext,
      error: null,
      complete: onComplete,
    });

    return hero$.asObservable();
  }

  serverStreamHeros(data: HeroById): Observable<Hero> {
    const subject = new Subject<Hero>();
    this.logger.log('HeroService.ServerStreamAsObservable received %o', data);

    const onNext = (item: Hero): void => {
      this.logger.log(
        'HeroService.ServerStreamAsObservable responses %o',
        item,
      );
    };
    const onComplete = (): void => {
      this.logger.log('HeroService.ServerStreamAsObservable completed');
    };
    subject.subscribe({
      next: onNext,
      error: null,
      complete: onComplete,
    });

    let i = 0;
    setInterval(() => {
      if (i >= this.items.length) {
        subject.complete();
      } else {
        const item = this.items[i];
        subject.next(item);
        i += 1;
      }
    }, 1000);

    return subject.asObservable();
  }

  bidiStreamHeros(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroById) => {
      this.logger.log(
        'HeroService.BidirectionalStreamAsObservable received %o',
        heroById,
      );
      const item = this.items.find(({ id }) => id === heroById.id);
      this.logger.log(
        'HeroService.BidirectionalStreamAsObservable responses %o',
        item,
      );
      hero$.next(item);
    };
    const onComplete = (): void => {
      this.logger.log('HeroService.BidirectionalStreamAsObservable completed');
    };
    data$.subscribe({
      next: onNext,
      error: null,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
