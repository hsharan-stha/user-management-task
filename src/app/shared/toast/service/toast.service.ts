import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {ToastComponent} from '@/app/shared/toast/toast.component';
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private componentRef?: ComponentRef<ToastComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public show(message: string,icon:IconDefinition): void {
    this.drop();
    this.createToastComponent(message,icon);
    this.scheduleRemoval();
  }

  private createToastComponent(message: string,icon:IconDefinition): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
    this.componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(this.componentRef.hostView);

    const instance = this.componentRef.instance;
    instance.message = message;
    instance.icon = icon;

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  private scheduleRemoval(): void {
    setTimeout(() => {
      this.drop();
    }, 2000);
  }

  private drop(): void {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
