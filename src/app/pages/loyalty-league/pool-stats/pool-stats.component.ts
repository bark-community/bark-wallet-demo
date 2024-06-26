import { AsyncPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';

import { LoyaltyService } from 'src/app/services/loyalty-points.service';
import { IonIcon } from '@ionic/angular/standalone';
import { IonSkeletonText } from '@ionic/angular/standalone';
import { PrizePool } from 'src/app/models';
import { of } from 'rxjs';
import { informationCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TooltipModule } from 'src/app/shared/layouts-league/tooltip/tooltip.module';
@Component({
  selector: 'app-pool-stats',
  templateUrl: './pool-stats.component.html',
  styleUrls: ['./pool-stats.component.scss'],
  standalone: true,
  imports: [TooltipModule, DecimalPipe, AsyncPipe, DatePipe, PercentPipe, IonSkeletonText, IonIcon]
})
export class PoolStatsComponent {
  constructor(){
    addIcons({informationCircleOutline})
  }
  public lls = inject(LoyaltyService);
  public nextAirdrop$ = this.lls.getNextAirdrop();
  @Input() prizePool$ = of({} as PrizePool) 
  @Input() totalPts = 0
 

}
