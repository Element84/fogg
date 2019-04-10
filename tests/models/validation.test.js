import Validation, { regexByFieldName } from 'models/validation';

describe('Validation', () => {
  const rules = {
    firstName: {
      required: true
    },
    lastName: {
      minLength: 4,
      maxLength: 8
    },
    email: {
      required: true,
      regex: regexByFieldName('email')
    }
  };

  describe('byField', () => {
    const validate = new Validation(rules);

    it('should return true a valid input', () => {
      expect(validate.byField('firstName', 'Frank')).toEqual(true);
    });

    it('should return false with no input', () => {
      expect(validate.byField('firstName')).toEqual(false);
      expect(validate.byField('firstName', undefined)).toEqual(false);
      expect(validate.byField('firstName', null)).toEqual(false);
    });

    it('should return true if no value on a not required field', () => {
      expect(validate.byField('lastName')).toEqual(true);
      expect(validate.byField('lastName', undefined)).toEqual(true);
    });

    it('should return proper valid state for min and max length rules', () => {
      expect(validate.byField('lastName', 'Whi')).toEqual(false);
      expect(validate.byField('lastName', 'White')).toEqual(true);
      expect(validate.byField('lastName', 'WalterWhite')).toEqual(false);
    });

    it('should return proper valid state for regex rules', () => {
      expect(validate.byField('email', 'walter@greymatter.tech')).toEqual(true);
      expect(validate.byField('email', 'walter.white@greymatter.tech')).toEqual(
        true
      );
      expect(validate.byField('email', 'walter@greymatter.tech.org')).toEqual(
        true
      );
      expect(
        validate.byField('email', 'walter.white@greymatter.tech.org')
      ).toEqual(true);
      expect(validate.byField('email', '@greymatter.tech')).toEqual(false);
      expect(validate.byField('email', 'walter@')).toEqual(false);
      expect(validate.byField('email', 'walter@org')).toEqual(false);
    });
  });
});
