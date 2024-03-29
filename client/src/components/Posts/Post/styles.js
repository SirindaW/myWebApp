import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    minHeight: '480px',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
    overflow: 'hidden',
    
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  likeCount: {
    display: 'flex',
    margin: '0px 20px 10px 20px'
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
    '&:hover': {
      filter: 'brightness(75%)',
      transition: '0.4s',
    }
  },
  ellipsis: {
    maxHeight: '120px',
    paddingBottom: '28px',
    marginBottom: '10px',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '6', /* number of lines to show */
    '-webkit-box-orient': 'vertical',
  }
});