import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Dropdown } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
    const [username, setUsername] = useState(""); // Khởi tạo state cho username
    const navigate = useNavigate();

    // Gọi API để lấy thông tin người dùng
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage

            if (token) {
                try {
                    const response = await fetch("http://127.0.0.1:4000/api/profile/", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}` // Thêm token vào header
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data.username); // Lưu username từ response vào state
                    } else {
                        console.error("Failed to fetch profile");
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, []);

    // Xử lý khi click vào "Profile"
    const handleProfileClick = () => {
        navigate("/profile"); // Điều hướng đến trang Profile
    };

    // Xử lý khi click vào "Logout"
    const handleLogout = () => {
        localStorage.removeItem("accessToken"); // Xóa token khỏi localStorage
        navigate("/"); // Điều hướng đến trang đăng nhập
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={handleProfileClick}>
                <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={handleLogout}>
                <span className="logout-btn">Logout</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {/* Thêm logo hoặc các thành phần khác */}
            </div>
            <div className="search">
                <div className="search-input-container">
                    <input type="text" placeholder="Search" className="search-input" />
                </div>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            </div>

            <div className="user-profile">
                <Dropdown overlay={menu} trigger={['click']} className="profile-menu">
                    <div onClick={(e) => e.preventDefault()}>
                        {/* Không cần ảnh nếu không có trường image */}
                        <span className="username">{username || "Guest"}</span>
                        <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
                    </div>
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;
