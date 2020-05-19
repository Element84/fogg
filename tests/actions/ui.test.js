import { openModal, closeModal } from '../../src/actions';

describe('actions > ui', () => {
  describe('openModal', () => {
    const expectedAction = {
      type: 'UPDATE_MODAL',
      data: {
        test: {
          isOpen: true
        }
      }
    };

    it('should update the results with the response', () => {
      expect(openModal('test')).toEqual(expectedAction);
    });
  });

  describe('closeModal', () => {
    const expectedAction = {
      type: 'UPDATE_MODAL',
      data: {
        test: {
          isOpen: false
        }
      }
    };

    it('should update the results with the response', () => {
      expect(closeModal('test')).toEqual(expectedAction);
    });
  });
});
