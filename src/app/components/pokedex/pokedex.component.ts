import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokemonList: any[] = [];
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
    this.fetchPokemonList();
  }

  async fetchPokemonList() {
    try {
      // Obtenemos los primeros 20 Pokémon
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();
      const results = data.results;

      // Iteramos sobre cada Pokémon y obtenemos sus detalles
      for (const pokemon of results) {
        const pokemonData = await this.fetchPokemonDetails(pokemon.url);
        this.pokemonList.push(pokemonData);
      }
    } catch (error) {
      console.error('Error fetching Pokemon list', error);
    }
  }

  async fetchPokemonDetails(url: string) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokemon details', error);
      return null;
    }
  }

  // Getter para obtener la lista filtrada
  get filteredPokemonList(): any[] {
    if (!this.searchTerm) {
      return this.pokemonList;
    }
    return this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Método para capitalizar la primera letra del nombre
  capitalize(str: string): string {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  // Método para obtener los tipos de un Pokémon en formato de cadena
  getPokemonTypes(pokemon: any): string {
    if (!pokemon || !pokemon.types) return '';
    return pokemon.types.map((t: any) => this.capitalize(t.type.name)).join(', ');
  }
}
