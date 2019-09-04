import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  addHero(name: string): void {
    name = name.trim();

    if (!name) {
      return;
    }

    this.heroService
      .addHero({ name } as Hero)
      .subscribe(newHero => this.heroes.push(newHero));
  }

  deleteHero(heroToDelete: Hero): void {
    this.heroes = this.heroes.filter(hero => hero.id !== heroToDelete.id);
    this.heroService.deleteHero(heroToDelete).subscribe();
  }
}
