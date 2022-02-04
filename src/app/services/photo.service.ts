import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  constructor(){}

  public async addNewToGallery():Promise<Photo>{
    // Take a photo
    return await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
    .catch(Error => Error) //<= Avoids display errors on browser console
  }

}
