export interface Parkingrevenue {
  fseater: {
    in: number;
    out: number;
    revenue: number;
  };
  sseater: {
    in: number;
    out: number;
    revenue: number;
  };
  truck: {
    in: number;
    out: number;
    revenue: number;
  };
}

export const STATICS_BASE_VALUE: Parkingrevenue = {
  fseater: {
    in: 0,
    out: 0,
    revenue: 0,
  },
  sseater: {
    in: 0,
    out: 0,
    revenue: 0,
  },
  truck: {
    in: 0,
    out: 0,
    revenue: 0,
  },
};
