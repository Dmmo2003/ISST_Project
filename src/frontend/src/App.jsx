import { useState, useEffect } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import LeftMenu from './LeftMenu.jsx'
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import './App.css'

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  useEffect(() => {
    const menu = document.querySelector('.menu-izquierda');
    menu.classList.add('encogido');
    if (menu) {
      // menu.addEventListener('mouseover', () => {
      //   menu.classList.remove('encogido');
      // });

      // menu.addEventListener('mouseout', () => {
      //   menu.classList.add('encogido');
      // });
      if (menuAbierto) {
        menu.classList.remove('encogido');
      } else {
        menu.classList.add('encogido');
      }
    }
  }, [menuAbierto]);

  return (
    <div id="root">
      <Header  toggleMenu={toggleMenu} MenuIcon={MenuIcon}/>
      <LeftMenu  CloseIcon={CloseIcon} toggleMenu={toggleMenu}/>
      <div id="main-content">
        <h1>Prueba2</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum nulla vel quam blandit, et pulvinar sapien volutpat. Maecenas venenatis nisl non iaculis ultricies. Maecenas scelerisque maximus odio, vitae pulvinar sapien viverra vel. Cras a vestibulum quam, eleifend lacinia tortor. Aliquam a tellus venenatis, dignissim eros in, pulvinar dolor. Maecenas pretium dui vitae placerat fermentum. Ut imperdiet eu ex et sagittis. Sed bibendum a dui vitae ullamcorper. Cras maximus, massa tempus sodales convallis, odio metus vestibulum orci, id tempor mi diam sed nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam eget cursus elit. Duis id magna erat. Maecenas sit amet purus mi. Ut finibus risus diam, at fringilla dolor fringilla a.
          Sed vitae ligula at mi lacinia gravida. Etiam vel tristique mi. Nam tincidunt porttitor tempus. Sed eu quam sem. Ut eget pharetra purus, quis ornare dolor. Etiam neque dolor, auctor eu arcu sit amet, condimentum vestibulum mauris. Integer semper ex sit amet lectus consequat euismod. Etiam auctor volutpat velit, in pretium lorem ullamcorper et. Duis eu leo eget ante posuere viverra. Donec sit amet nibh sit amet est aliquam malesuada. Maecenas rutrum bibendum tortor nec bibendum. Quisque ultrices pulvinar ligula, vel ultricies lacus pellentesque a. Vivamus facilisis massa vitae est rutrum ultrices. Aliquam erat volutpat. Mauris tempor eros et elit condimentum maximus. Fusce condimentum enim non nibh aliquam, nec placerat elit pharetra.
          Donec congue, tellus eget ornare vehicula, elit libero congue nunc, consequat aliquet tellus ligula sed erat. Mauris at consectetur quam. Aliquam sodales accumsan dictum. Phasellus luctus velit tempor, tristique dolor in, eleifend est. Nunc non auctor nibh. Praesent gravida sem feugiat, suscipit neque sed, pharetra erat. In tincidunt aliquet nunc a ullamcorper. Duis porttitor gravida tellus, ac maximus enim tincidunt laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis scelerisque nunc. Vivamus gravida feugiat erat, et suscipit diam maximus id. Duis posuere felis nec est pellentesque, vel lobortis magna vulputate. In accumsan volutpat mi, eu commodo dui auctor et.
          Aenean suscipit gravida lectus, eget vestibulum purus tempor eget. Vestibulum purus mi, sagittis vel pretium a, varius malesuada mi. Praesent eu feugiat risus. Vestibulum eu ante ac risus convallis convallis. Donec vitae posuere velit. Sed lobortis sagittis dui a finibus. Nam non convallis leo, ac lacinia neque
          Nulla quis massa at eros egestas tincidunt. Duis elit augue, fermentum vel finibus a, lobortis vel orci. Donec fermentum sollicitudin dolor, et molestie sapien pulvinar at. Vestibulum a tincidunt ante, blandit semper ipsum. Vivamus ullamcorper magna tincidunt gravida gravida. Maecenas ultricies enim orci, eu faucibus metus gravida eu. Duis posuere, dui nec consequat condimentum, nisl ex volutpat felis, ac lobortis augue nibh vitae orci. Donec sit amet efficitur est, vitae molestie purus. Ut consequat velit sit amet diam scelerisque sagittis. Quisque at porta sem. Maecenas ac justo a erat congue fermentum. Suspendisse vestibulum massa rhoncus augue tincidunt consequat. Aliquam lobortis sapien in orci tempor imperdiet. Cras sagittis turpis eget nulla pretium interdum.
          Quisque sed eleifend velit. In sem dui, vulputate in volutpat at, facilisis at nibh. Fusce sodales lectus et eros ullamcorper, eget aliquet neque tincidunt. Proin eget luctus mi. Fusce ut mi ligula. Suspendisse laoreet rutrum augue in cursus. Nunc consectetur lorem placerat vulputate ornare. Nulla convallis est at arcu mattis, id placerat sem blandit.
          Etiam finibus eros vitae nibh condimentum, eu ultricies magna lacinia. Phasellus non tristique nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venenatis accumsan purus, at vehicula nisi posuere nec. Suspendisse eget dolor molestie lectus finibus ullamcorper. Quisque pharetra nisi ut mattis vulputate. Sed ultricies tellus quis magna hendrerit, nec feugiat purus elementum. Integer ac egestas erat. Sed at lectus faucibus, condimentum odio et, pulvinar lectus. In diam nisl, viverra eu efficitur tincidunt, faucibus posuere libero. Sed tempus ac massa vitae aliquam. Vivamus non sapien a est efficitur ultrices. In dapibus, augue eget sollicitudin consequat, odio leo varius est, eu ornare dui velit efficitur ligula. Sed at felis erat.
          Suspendisse eleifend orci mi, ac lobortis odio consectetur condimentum. Duis non lacus quis lorem mattis facilisis. Nam auctor nulla libero, quis varius ex lacinia eget. Cras non leo quis massa suscipit sagittis ut non purus. Nulla gravida iaculis maximus. Nullam mattis dictum enim, sodales sagittis justo hendrerit vel. In non lectus placerat, fermentum erat quis, fringilla purus. Ut commodo nunc ac est molestie semper. Vestibulum non dui quis eros cursus aliquam ultrices id orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque est nisl, posuere et enim a, lobortis faucibus urna.
          Morbi et eleifend orci. Cras id erat nulla. Donec sagittis neque et urna venenatis molestie. Fusce non iaculis quam, posuere mattis orci. Proin nunc ex, vulputate in porta at, suscipit vitae odio. Praesent nec ligula aliquet, posuere nibh at, tristique libero. Nulla facilisi. In at nibh neque. Proin dictum tempus leo, at lobortis enim. Aenean tincidunt erat nec turpis euismod pharetra. Mauris a rutrum mi, vel vestibulum tellus. Curabitur euismod non massa eget luctus. Quisque ut massa nec augue posuere congue. Integer vel vehicula ex. In vitae vulputate lorem, at vehicula tortor. Donec efficitur suscipit ante sit amet euismod.
          Curabitur fermentum commodo massa, at mattis quam imperdiet id. Pellentesque a venenatis arcu. Curabitur maximus tortor condimentum elit auctor vehicula. Aliquam scelerisque vestibulum mi, feugiat blandit massa gravida a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse aliquet sem at posuere iaculis. Curabitur auctor, augue a faucibus mattis, nunc ex mattis quam, quis ullamcorper leo quam sed orci. Vivamus sed quam et felis elementum pellentesque. Nulla vulputate, arcu sed bibendum gravida, neque sapien tristique diam, nec efficitur tortor velit et nunc. Vestibulum quis tellus sed mauris feugiat auctor non ac ligula. Nulla commodo ex leo, vel facilisis velit mollis eu. Donec quis rhoncus urna, at convallis nisl.</p>
      </div>



      <Footer id="footer" />
    </div>
  )
}

export default App
