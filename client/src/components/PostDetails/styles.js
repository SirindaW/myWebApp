import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    overflowX: 'scroll'
  },
  loadingPaper: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px', 
    borderRadius: '15px', 
    height: '39vh',
  },
  ellipsis: {
    maxHeight: '70px',
    paddingBottom: '10px',
    marginBottom: '10px',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3', /* number of lines to show */
    '-webkit-box-orient': 'vertical',
  },
  post: {
    margin: '20px',
    padding: '20px',
    cursor: 'pointer',
    width: '270px',
    borderRadius: '15px',
    '&:hover': {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      transition: '0.4s',
    }
  },
  commentsOuterContainer: {
    // display: 'flex', 
    // justifyContent: 'space-between'
  },
  commentsInnerContainer: {
    maxHeight: '200px',
    overflowY: 'auto',
    margin: '15px 30px 0 0' 
  },
  buttonContainer: {
    display: 'flex', 
    justifyContent: 'right',
    marginBottom: '7px'
  }
}));