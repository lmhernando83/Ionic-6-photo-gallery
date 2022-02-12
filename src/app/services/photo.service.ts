import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory, WriteFileResult } from '@capacitor/filesystem';

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

    console.log('Foto ==>', capturedPhoto);

    const saveImageFile: IUserPhoto = await this.savePicture(capturedPhoto);
    this.photos.unshift(saveImageFile)

    console.log('Array de fotos',this.photos);
  }

  public async savePicture(photo: Promise<Photo>): Promise<any>{

    console.log('SavePicture Photo recive =>', photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile: Promise<WriteFileResult> = await Filesystem.writeFile({
      path: fileName,
      data: (await photo).webPath,
      directory: Directory.Data
    })
    .catch(Error => Error);
    
    console.log('savePciture return =>', savedFile);

    return {
      filepath: fileName,
      webviewPath: (await photo).webPath
    };
  }

}
