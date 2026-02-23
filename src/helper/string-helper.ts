export class StringHelper {
  public static generateProfilePicture(name: string): string {
    return `https://ui-avatars.com/api/?name=${name}&background=random`;
  }
}
