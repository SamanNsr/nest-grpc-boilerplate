import { Observable } from 'rxjs';
import { Hero, HeroById } from 'src/interfaces/pb/hero';

export interface IHeroService {
  getHeroBiyId(id: number): Hero;
  getHeroByClientStream(data$: Observable<HeroById>): Observable<Hero>;
  serverStreamHeros(data: HeroById): Observable<Hero>;
  bidiStreamHeros(data$: Observable<HeroById>): Observable<Hero>;
}
