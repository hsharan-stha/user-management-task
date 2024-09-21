import { Injectable, ComponentRef, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {ConfirmComponent} from "@/app/shared/confirm/confirm.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private componentRef!: ComponentRef<ConfirmComponent>;
  private responseSubject = new Subject<boolean>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public confirm(header: string, message: string): Observable<boolean> {
    this.createComponent(header, message);
    return this.responseSubject.asObservable();
  }

  private createComponent(header: string, message: string): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ConfirmComponent);
    this.componentRef = factory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);

    document.body.appendChild((this.componentRef.hostView as any).rootNodes[0]);

    this.componentRef.instance.show(header, message);

    this.componentRef.instance.confirm.subscribe(() => this.onConfirm());
    this.componentRef.instance.cancel.subscribe(() => this.onCancel());
  }

  private onConfirm(): void {
    this.responseSubject.next(true);
    this.cleanup();
  }

  private onCancel(): void {
    this.responseSubject.next(false);
    this.cleanup();
  }

  private cleanup(): void {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}
