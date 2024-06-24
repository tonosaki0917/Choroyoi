export type StackParamList = {
    Home: undefined;
    QuizSelect: undefined;
    QuizDetail: { breadId: number | null, breadExp: string | null, breadImg: string | null };
    MapDefault: { breadId: number | null, latitude: number | null, longitude: number | null };
    NearBakery: { breadId: number | null };
    BreadDetail: { breadId: number | null };
    TakePhoto: { breadId: number | null };
    PhotoCheck: { breadId: number | null, photoUri: string };
    ResultCorrect: { breadId: number | null };
    ResultFalse: { breadId: number | null };
    ResultGiveUp: { breadId: number | null };
  };