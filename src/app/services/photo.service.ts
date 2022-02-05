import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

export interface IUserPhoto {
  filepath: string;
  webviewPath: string;
}

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  public photos: IUserPhoto[] = []

  constructor(){}

  public async addNewToGallery():Promise<void>{
    // Take a photo
    const capturedPhoto:Promise<Photo> = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    })
    .catch(Error => Error) //<= Avoids display errors on browser console

    console.log('Foto ==>', capturedPhoto)

    this.photos.unshift({
      filepath: 'Soon...',
      webviewPath: (await capturedPhoto).webPath
    })

    console.log('Array de fotos',this.photos)
  }

}
