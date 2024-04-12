import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.page.html',
  styleUrls: ['./swap.page.scss']
})
export class SwapPage implements OnInit {
  tradeHistoryTable: any[] = [];
  columns: any[] = [];
  error: string = '';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.fetchTradeHistory();
    this.initializeColumns();
  }

  private fetchTradeHistory() {
    this.portfolioService.getTradeHistory()
      .pipe(
        catchError(error => {
          console.error('Error fetching trade history:', error);
          this.error = 'Failed to fetch trade history. Please try again later.';
          return throwError(error);
        })
      )
      .subscribe(
        (history: any[]) => {
          this.tradeHistoryTable = history;
        }
      );
  }

  private initializeColumns() {
    this.columns = [
      { name: 'Date', prop: 'date' },
      { name: 'Asset', prop: 'asset' },
      { name: 'Type', prop: 'type' },
      { name: 'Amount', prop: 'amount' },
      { name: 'Price', prop: 'price' },
      { name: 'Total', prop: 'total' }
    ];
  }
}
