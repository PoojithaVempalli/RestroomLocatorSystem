import React , {useState , useEffect}from 'react';
import {analytics , firebase , firebaseDb} from "../../firebase"
import { getAnalytics, logEvent } from "firebase/analytics";
import { onValue } from 'firebase/database';
import { getStorage, ref } from "firebase/storage";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { getAuth, signOut } from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import { Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {db} from "../../firebase"
import { collection, addDoc , getDocs , doc, deleteDoc ,updateDoc} from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




const defaultTheme = createTheme();

const formStyle = {
  width: '100%',
  maxWidth: '700px',
  padding: '16px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  margin: '0 auto',
};

const alertstyle = {
  width: '100%',
  maxWidth: '700px',
  padding: '16px',
  border: '1px solid skyblue',
  borderRadius: '4px',
  margin: '0 auto',
  marginTop: '10px',
  marginBottom: '15px',
}

const recordsStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  marginTop: '10px',
  marginBottom: '10px',
  padding: '16px',
};

const fieldStyle = {
  marginBottom: '16px',
};

const buttonStyle = {
  marginTop: '16px',
};


function AdminHome() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: '1',
  });
  const [formDatas, setFormDatas] = useState([]);
  const [recordsVisible, setRecordsVisible] = useState(false);

  const fetchPost = async () => {
       
    await getDocs(collection(db, "reviews"))
        .then((querySnapshot)=>{              
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setFormDatas(newData);                
            console.log(newData,formDatas);
        })
   
}

const handleDelete = async (docId) => {
  try {
    const pinDocRef = doc(db, 'reviews', docId); // Specify the collection ('pins') and the document ID to delete
    await deleteDoc(pinDocRef); // Delete the document
    alert('Record deleted successfully');
    fetchPost(); // Fetch the updated list of records
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

useEffect(()=>{
  fetchPost();
}, [])


  const addTodo = async (e) => {
    e.preventDefault();

    try {
      
      const data = {
        name: formData.name,
        email: formData.email,
        review: formData.review,
        rating: formData.rating,
      };

      const docRef = await addDoc(collection(db, 'reviews'), data);
      console.log('Document written with ID: ', docRef.id);
      alert("Data Added Successfully");
      fetchPost();
      setFormData({
        name: '',
        email:'',
        review:'',
        rating: '1',
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error', error);
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Welcome to Review Page 
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
         If your dreams don't scare you, they are too small
        </Typography>
      </Container>
      <Divider style={{fontWeight:'bold'}}>Provide your valuable Testimonal's</Divider>

      <form onSubmit={addTodo} style={formStyle} method='POST'>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        style={fieldStyle}
      />
      <TextField
        label="E Mail"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        fullWidth
        style={fieldStyle}
      />
      <TextField
        label="Review Page "
        name="review"
        value={formData.review}
        onChange={handleInputChange}
        fullWidth
        style={fieldStyle}
      />
      <FormControl fullWidth style={fieldStyle}>
        <InputLabel>Rating (out of 5)</InputLabel>
        <Select
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          label="Rating"
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" style={buttonStyle} fullWidth>
        Submit Your Review 
      </Button>
    </form>
    

     
    </ThemeProvider>
  );
}


export default AdminHome;
