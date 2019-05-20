import ui from '../../src/reducers/ui';

describe('reducers > ui', () => {
  it('should return default state', () => {
    expect(ui(undefined, {})).toEqual({});
  });

  describe('UPDATE_MODAL', () => {
    it('should return modal', () => {
      let initialState = {
        modals: {
          test: {
            isOpen: true
          },
          test2: {
            isOpen: false
          }
        }
      };

      const expectedState = {
        modals: {
          test: {
            isOpen: false
          },
          test2: {
            isOpen: false
          }
        }
      };

      const updatedState = ui(initialState, {
        type: 'UPDATE_MODAL',
        data: {
          test: {
            isOpen: false
          }
        }
      });

      expect(updatedState).toEqual(expectedState);
    });
  });
});
