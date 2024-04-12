import { Injectable, effect, signal } from '@angular/core';
import { UtilService } from './util.service';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, firstValueFrom, map, shareReplay } from 'rxjs';
import { loyaltyBoard, LoyaltyScore, NextAirdrop, PrizePool } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {
  private _loyaltyBoard$ = new BehaviorSubject(null as loyaltyBoard);
  public llb$ = this._loyaltyBoard$.asObservable().pipe(this._utilService.isNotNullOrUndefined)

  protected api = this._utilService.serverlessAPI + '/api/loyalty-points'
  constructor(
    private _utilService: UtilService,
    private _apiService: ApiService,
    // private _toasterService:ToasterService
  ) {
    if (!this._loyaltyBoard$.value) {
      firstValueFrom(this.getloyaltyBoard()).then(lllb => this._loyaltyBoard$.next(lllb))

    }
  }

  // private _formatErrors(error: any) {
  //   console.warn('my err', error)
  //   this._toasterService.msg.next({
  //     message: error.message || 'fail to load loyalty program',
  //     segmentClass: "toastError",
  //   });
  //   return throwError((() => error))
  // }
  public getNextAirdrop(): Observable<NextAirdrop> {
    return this._apiService.get(`${this.api}/get-next-airdrop`).pipe(
      this._utilService.isNotNull,
      shareReplay(),
      // catchError((err) => this._formatErrors(err))
    )
  }
  public getLoyaltyScore(): Observable<LoyaltyScore> {
    return this._apiService.get(`${this.api}/score`).pipe(
      shareReplay(),
      this._utilService.isNotNull,
      map((loyaltyScore: LoyaltyScore) => {

        return loyaltyScore
      }),
      // catchError((err) => this._formatErrors(err))
    )
  }
  public getloyaltyBoard(): Observable<loyaltyBoard> {
    return this._apiService.get(`${this.api}/leader-board`).pipe(
      this._utilService.isNotNull,
      map((loyaltyBoard: loyaltyBoard) => {
        return loyaltyBoard
      }),
      shareReplay(),
      // catchError((err) => this._formatErrors(err))
    )
  }
  public getPrizePool(): Observable<PrizePool> {
    return this._apiService.get(`${this.api}/prize-pool`).pipe(
      this._utilService.isNotNull,
      map((prizePool: PrizePool) => {
        return prizePool
      }),
      shareReplay(),
      // catchError((err) => this._formatErrors(err))
    )
  }

  public async addReferral(referer: string, participantAddress: string) {
    let data = null
    try {
      const res = await fetch(`${this.api}/referral?referAddress=${referer}&participantAddress=${participantAddress}`);
      data = await res.json();
    } catch (error) {
      console.warn(error);
    }
    return data
  }
}
