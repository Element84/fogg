import { Validation } from '../../models';
import { regexByFieldName } from 'lib/input';

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
    },
    confirmEmail: {
      required: true,
      regex: regexByFieldName('email'),
      dependencies: [
        {
          field: 'email',
          exactMatch: true
        }
      ]
    },
    password: {
      minLength: 8,
      isValid: value => {
        // Check that the value has "coolbeans" in it
        // for testing purposes
        return value.includes('coolbeans');
      }
    },
    number: {
      required: true
    },
    radioList: {
      required: true
    }
  };

  const validFields = {
    firstName: {
      value: 'Gustavo'
    },
    lastName: {
      value: 'Fring'
    },
    email: {
      value: 'gus.bus@fring.com'
    },
    confirmEmail: {
      value: 'gus.bus@fring.com'
    },
    password: {
      value: 'coolbeans88'
    },
    number: {
      value: 0
    },
    radioList: {
      value: ['blue']
    }
  };

  describe('updateRules', () => {
    const validate = new Validation({});

    it('should update rules on validation object', () => {
      expect(validate.rules).toEqual({});

      validate.updateRules(rules);

      expect(validate.rules).toEqual(rules);
    });
  });

  describe('byField', () => {
    const validate = new Validation(rules);

    it('should return true a valid input', () => {
      expect(validate.byField('firstName', 'Walter')).toEqual(true);
      expect(validate.byField('password', '')).toEqual(true);
      expect(validate.byField('radioList', ['white'])).toEqual(true);
      expect(validate.byField('radioList', [0])).toEqual(true);
      expect(validate.byField('radioList', ['white', 0])).toEqual(true);
    });

    it('should return false with no input', () => {
      expect(validate.byField('firstName')).toEqual(false);
      expect(validate.byField('firstName', undefined)).toEqual(false);
      expect(validate.byField('firstName', null)).toEqual(false);
      expect(validate.byField('radioList', [undefined])).toEqual(false);
      expect(validate.byField('radioList', [null])).toEqual(false);
      expect(validate.byField('radioList', [undefined, null])).toEqual(false);
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

    it('should return return true if the custom isValid function is truthy', () => {
      expect(validate.byField('password', 'coolbeans88')).toEqual(true);
      expect(validate.byField('password', 'beansthatarenotcool99')).toEqual(
        false
      );
    });

    it('should return return true if there is no rule for the field', () => {
      expect(validate.byField('colby', 'cool')).toEqual(true);
    });

    it('should consider 0 valid input and not empty', () => {
      expect(validate.byField('number', 0)).toEqual(true);
    });

    describe('Dependencies', () => {
      it('should validate exactMatch dependencies', () => {
        const fieldDependencies = [
          {
            ...rules.confirmEmail.dependencies[0],
            value: 'walter.white@greymatter.tech.org'
          }
        ];

        expect(
          validate.byField(
            'confirmEmail',
            'walter.white@greymatter.tech.org',
            fieldDependencies
          )
        ).toEqual(true);
        expect(
          validate.byField(
            'confirmEmail',
            'walter@greymatter.tech.org',
            fieldDependencies
          )
        ).toEqual(false);
      });
    });
  });

  describe('bySet', () => {
    const validate = new Validation(rules);

    it('should return true for valid inputs', () => {
      expect(validate.bySet(validFields)).toEqual(true);
      expect(
        validate.bySet(
          Object.assign({}, validFields, {
            password: {
              value: ''
            }
          })
        )
      ).toEqual(true);
    });

    it('should return false for invalid inputs', () => {
      expect(
        validate.bySet(
          Object.assign({}, validFields, {
            firstName: {
              value: undefined
            }
          })
        )
      ).toEqual(false);
      expect(
        validate.bySet(
          Object.assign({}, validFields, {
            lastName: {
              value: 'Bus'
            }
          })
        )
      ).toEqual(false);
      expect(
        validate.bySet(
          Object.assign({}, validFields, {
            email: {
              value: 'blue'
            }
          })
        )
      ).toEqual(false);
    });

    describe('Dependencies', () => {
      it('should validate exactMatch dependencies by the set', () => {
        const key = 'confirmEmail';
        const invalidFields = {
          ...validFields,
          [key]: {
            ...validFields[key],
            value: 'gus@fring.com'
          }
        };

        expect(validate.bySet(validFields, true)).toEqual([]);
        expect(validate.bySet(invalidFields, true)).toEqual([key]);
      });
    });
  });
});
