import React from "react";

export default function SizeGuide() {
  return (
    <div className="modal fade modalCentered modal-find-size" id="sizeGuide">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="heading">Size Guide</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="tf-rte">
            <div className="tf-table-res-df">
              <div className="title">Size guide</div>
              <table className="tf-sizeguide-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>US</th>
                    <th>Chest</th>
                    <th>Waist</th>
                    <th>Hip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>2</td>
                    <td>32</td>
                    <td>24 - 25</td>
                    <td>33 - 34</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>4</td>
                    <td>34 - 35</td>
                    <td>26 - 27</td>
                    <td>35 - 26</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>6</td>
                    <td>36 - 37</td>
                    <td>28 - 29</td>
                    <td>38 - 40</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>8</td>
                    <td>38 - 29</td>
                    <td>30 - 31</td>
                    <td>42 - 44</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>10</td>
                    <td>40 - 41</td>
                    <td>32 - 33</td>
                    <td>45 - 47</td>
                  </tr>
                  <tr>
                    <td>XXL</td>
                    <td>12</td>
                    <td>42 - 43</td>
                    <td>34 - 35</td>
                    <td>48 - 50</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tf-page-size-chart-content">
              <div>
                <div className="title">Size guide</div>
                <ul>
                  <li className="text">1. Chest</li>
                  <li className="text-main">
                    Measure at the fullest part of your chest, keeping the tape
                    parallel to the floor.
                  </li>
                  <li className="text">2. Waist</li>
                  <li className="text-main">
                    Measure at the smallest part of your waist. This is usually
                    below the rib cage and above the hip bone.
                  </li>
                  <li className="text">3. Hip</li>
                  <li className="text-main">
                    Measure at the fullest part of your seat, keeping the tape
                    parallel to the floor.
                  </li>
                </ul>
              </div>
              <div className="text-md-end text-center">
                <img
                  className="sizechart lazyload"
                  data-src="/images/section/size-guide.png"
                  alt=""
                  src="/images/section/size-guide.png"
                  width={258}
                  height={297}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
