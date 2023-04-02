import image1 from '../../assets/images/mock-1.jpg';
import image2 from '../../assets/images/mock-2.jpg';
import image3 from '../../assets/images/mock-3.jpg';
import image4 from '../../assets/images/mock-4.jpg';

const initialState = {
  data: [
    {
      src: image1,
      alt: '',
    },
    {
      src: image2,
      alt: '',
    },
    {
      src: image3,
      alt: '',
    },
    {
      src: image4,
      alt: '',
    },
  ],
};

export const picturesReducer = (
  state = initialState,
  action: ActionsType
): PicturesReducerType => {
  switch (action.type) {
    case 'pictures/FETCH_PICTURES':
      return { ...state };
    default:
      return state;
  }
};

export const fetchPictures = () =>
  ({ type: 'pictures/FETCH_PICTURES' } as const);

type ActionsType = ReturnType<typeof fetchPictures>;
export type PicturesReducerType = typeof initialState;
