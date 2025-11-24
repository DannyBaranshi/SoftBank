import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchResults } from '../../pages/search-results/search-results';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, SearchResults],
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class Search {
  query: string = '';
  results: string[] = [];
  highlightedWords: string[] = [];

  constructor(private router: Router, private renderer: Renderer2) {}

  onSearch() {
    const q = this.query.toLowerCase().trim();
    this.clearHighlights();
    this.results = [];

    if (!q) return;

    const bodyText = document.body.innerText.toLowerCase();
    const words = Array.from(new Set(bodyText.match(/\b\w+\b/g)));
    this.results = words.filter(word => word.includes(q));

    // Resaltar las coincidencias
    this.highlightedWords = this.results;
    this.highlightWords(this.highlightedWords);

    // Si hay coincidencia exacta con ruta, navegar
    if (this.results.length === 1 && q === this.results[0].toLowerCase()) {
      this.navigateTo(this.results[0]);
    }
  }

  navigateTo(item: string) {
    switch (item.toLowerCase()) {
      case 'inicio':
        this.router.navigate(['/']);
        break;
      case 'productos':
        this.router.navigate(['/productos']);
        break;
      case 'información':
        this.router.navigate(['/informacion']);
        break;
      default:
        console.log('Ruta no definida para:', item);
        break;
    }
  }

  highlightWords(words: string[]) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
  let node;

  while ((node = walker.nextNode())) {
    if (node.parentElement && node.nodeValue && regex.test(node.nodeValue)) {
      const span = this.renderer.createElement('span');
      span.innerHTML = node.nodeValue.replace(regex, '<mark>$1</mark>');
      this.renderer.insertBefore(node.parentNode, span, node);
      this.renderer.removeChild(node.parentNode, node);
    }
  }
}

  clearHighlights() {
  const marks = document.querySelectorAll('mark');
  marks.forEach(mark => {
    const parent = mark.parentNode!;
    const text = this.renderer.createText(mark.textContent || '');
    this.renderer.insertBefore(parent, text, mark);
    this.renderer.removeChild(parent, mark);
    parent.normalize();
  });
}

}
