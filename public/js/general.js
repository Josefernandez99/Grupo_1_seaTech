/* Open the sidenav */
function openNav() {
    document.querySelector('.nav-bar-mobile').style.width = "100%";
}

/* Close/hide the sidenav */
function closeNav() {
    document.querySelector('.nav-bar-mobile').style.width = "0";
}

function toggleSubMenuMovil() {
    const submenuItems = document.querySelector('.nav-bar-mobile .submenu-items');
    const getDisplay = getComputedStyle(submenuItems).display;
    submenuItems.style.display = (getDisplay == 'none') ? 'flex' : 'none';
}

function toggleSubMenuDefault() {
    const submenuItems = document.querySelector('.nav-bar-default .submenu-items');
    const getDisplay = getComputedStyle(submenuItems).display;
    submenuItems.style.display = (getDisplay == 'none') ? 'flex' : 'none';
}