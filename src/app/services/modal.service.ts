
export class ModalService {
  createModalKey = 'create-modal'
  editModalKey = 'edit-modal'
  infoModalKey = 'info-modal'
  archivedModalKey = 'archived-modal'

  toggleMap: {[uniqueKey: string]: any} = {};

  create(key: string) {
    this.toggleMap[key] = null;
  }

  remove(key: string) {
    delete this.toggleMap[key];
  }

  isShown(key: string): boolean {
    return this.toggleMap[key];
  }

  show(key: string) {
    this.toggleMap[key] = true;
  }

  hide(key: string) {
    this.toggleMap[key] = false;
  }

  constructor() { }
}
